const mapping: Record<string, string> = {
  'brand-guidelines': 'brand_guideline',
  brandalyzers: 'brandalyzer',
  invitations: 'invitation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
