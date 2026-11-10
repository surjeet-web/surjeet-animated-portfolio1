'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProjectCard } from '@/components/sections/project-card';
import type { PortfolioProject } from '@/content/portfolio';

const filters = ['All projects', 'Public source', 'Private work'] as const;
type Filter = typeof filters[number];
function readFilter(): Filter { const value = new URLSearchParams(window.location.search).get('type'); return value === 'public' ? 'Public source' : value === 'private' ? 'Private work' : 'All projects'; }
export function WorkExplorer({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<Filter>('All projects');
  const [search, setSearch] = useState('');
  useEffect(() => { function sync() { setFilter(readFilter()); setSearch(new URLSearchParams(window.location.search).get('q') ?? ''); } sync(); window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);
  function update(nextFilter: Filter, nextSearch: string) {
    setFilter(nextFilter); setSearch(nextSearch);
    const params = new URLSearchParams();
    if (nextFilter !== 'All projects') params.set('type', nextFilter === 'Public source' ? 'public' : 'private');
    if (nextSearch.trim()) params.set('q', nextSearch);
    window.history.replaceState(null, '', `${window.location.pathname}${params.size ? `?${params}` : ''}`);
  }
  const filtered = useMemo(() => projects.filter((project) => (filter === 'All projects' || project.visibility === (filter === 'Public source' ? 'public' : 'private')) && `${project.title} ${project.category} ${project.summary} ${project.stack.join(' ')}`.toLowerCase().includes(search.toLowerCase())), [filter, search, projects]);
  return <section className="work-explorer wrap"><div className="explorer-toolbar"><div className="filter-tabs" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => update(item, search)} aria-pressed={filter === item}>{item}<sup>{item === 'All projects' ? projects.length : projects.filter((project) => project.visibility === (item === 'Public source' ? 'public' : 'private')).length}</sup></button>)}</div><label className="search-field"><span className="sr-only">Search projects</span><input value={search} onChange={(event) => update(filter, event.target.value)} placeholder="Search a project or technology" type="search" /><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></label></div><p className="result-count" aria-live="polite">{filtered.length} project{filtered.length === 1 ? '' : 's'} · {filter.toLowerCase()}</p>{filtered.length ? <div className="all-work-grid">{filtered.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div> : <div className="empty-state"><h2>No matches. Try a different angle.</h2><p>Search for a project name or technology, or see the complete selection.</p><button onClick={() => update('All projects', '')}>Show all projects</button></div>}</section>;
}
