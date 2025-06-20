import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  // Map of route paths to display names
  private routeLabels: { [path: string]: string } = {
    '': 'Home',
    'dashboard': 'Dashboard',
    'propriedades': 'Propriedades Rurais',
    'cultivos': 'Safras e Cultivo',
    'pecuaria': 'Pecuária',
    'maquinaria': 'Máquinas e Equipamentos',
    'irrigacao': 'Irrigação',
    'estoque': 'Estoque e Armazéns',
    'financas': 'Financeiro Rural',
    'comercializacao': 'Comercialização e Logística',
    'funcionarios': 'Recursos Humanos',
    'ambiental': 'Gestão Ambiental / ESG',
    'analises': 'BI e Indicadores',
    'sensores': 'Integração com Sensores',
    'projetos': 'Projetos e Obras Rurais',
    'compliance': 'Compliance e Documentação',
    'mobile': 'Módulo Mobile',
    'configuracoes': 'Configurações',
    'seguranca': 'Segurança'
  };

  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      this.breadcrumbs.next(breadcrumbs);
    });
  }

  /**
   * Get the current breadcrumbs
   */
  getBreadcrumbs(): Observable<Breadcrumb[]> {
    return this.breadcrumbs.asObservable();
  }

  /**
   * Create breadcrumbs from the activated route
   */
  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // Get the route's URL segment
    const routeUrl = route.snapshot.url.map(segment => segment.path).join('/');

    // Add URL segment to the URL
    const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

    // Add breadcrumb if the route has a path
    if (routeUrl) {
      const label = this.getRouteLabel(routeUrl);
      breadcrumbs.push({ label, url: nextUrl });
    }

    // Add Home as the first breadcrumb if we're not at the root
    if (breadcrumbs.length > 0 && !breadcrumbs.some(b => b.url === '')) {
      breadcrumbs.unshift({ label: 'Home', url: '/' });
    }

    // Continue with child routes
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  /**
   * Get the display name for a route path
   */
  private getRouteLabel(path: string): string {
    return this.routeLabels[path] || path;
  }
}
