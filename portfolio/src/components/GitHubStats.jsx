import { useEffect, useState } from 'react';
import { useApiObject } from '../hooks/useApiData';
import { GITHUB_USERNAME } from '../data/data';
import * as Icon from './Icons';
import './GitHubStats.css';

// Map language name -> brand color (matches the rest of the portfolio).
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Python: '#3572A5',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  'C++': '#f34b7d',
  'C#': '#178600',
  Shell: '#89e051',
  Go: '#00ADD8',
};

// Format a relative time like "2 months ago".
function timeAgo(iso) {
  if (!iso) return '';
  const then = new Date(iso);
  const diff = Date.now() - then.getTime();
  const day = 86400000;
  if (diff < day) return 'today';
  if (diff < day * 7) return `${Math.floor(diff / day)}d ago`;
  if (diff < day * 30) return `${Math.floor(diff / (day * 7))}w ago`;
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`;
  return `${Math.floor(diff / (day * 365))}y ago`;
}

// Star count display: 1.2k, 234, etc.
function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function GitHubStats() {
  const settings = useApiObject('site-settings', {
    githubUsername: GITHUB_USERNAME,
    githubLabel: '06 — Open source',
    githubTitle: 'Profile activity',
    githubDesc:
      'Live data from the GitHub API — what I have shipped, the languages I write, and recent activity.',
  });
  const username = settings.githubUsername || GITHUB_USERNAME;

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const headers = { Accept: 'application/vnd.github+json' };

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
            { headers }
          ),
        ]);
        if (!u.ok || !r.ok) {
          throw new Error(`GitHub API error (${u.status}/${r.status})`);
        }
        const userJson = await u.json();
        const reposJson = await r.json();

        if (cancelled) return;
        setUser(userJson);
        setRepos(Array.isArray(reposJson) ? reposJson : []);
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err.message || 'Failed to load GitHub data');
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  // Aggregate language counts from repos (skip null, forks).
  const langCounts = (() => {
    const c = {};
    for (const r of repos) {
      if (r.fork) continue;
      if (!r.language) continue;
      c[r.language] = (c[r.language] || 0) + 1;
    }
    const total = Math.max(
      1,
      repos.filter((r) => !r.fork).length
    );
    return Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        color: LANG_COLORS[name] || '#8b949e',
        pct: Math.round((count / total) * 100),
      }));
  })();

  // Top 4 repos by stars (then by recency).
  const topRepos = (() => {
    return [...repos]
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      })
      .slice(0, 5)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        languageColor: LANG_COLORS[r.language] || '#8b949e',
        stars: r.stargazers_count,
        forks: r.forks_count,
        size: r.size,
        when: timeAgo(r.pushed_at),
      }));
  })();

  // Recent activity (last 4 pushes, by date).
  const recent = (() => {
    if (!repos.length) return [];
    return [...repos]
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        language: r.language,
        languageColor: LANG_COLORS[r.language] || '#8b949e',
        when: timeAgo(r.pushed_at),
      }));
  })();

  return (
    <section id="github" className="section stats-section">
      <div className="section-watermark" aria-hidden="true">
        07
      </div>
      <div className="container stats-inner fade-up visible">
        <div className="stats-head">
          <div className="section-label">{settings.githubLabel}</div>
          <h2 className="section-title">{settings.githubTitle}</h2>
          <p className="section-desc stats-desc">{settings.githubDesc}</p>
        </div>

        {loading && (
          <div className="gh-skeleton" aria-hidden="true">
            <div className="gh-skel-card" />
            <div className="gh-skel-card" />
            <div className="gh-skel-card" />
            <div className="gh-skel-card" />
          </div>
        )}

        {error && !loading && (
          <div className="gh-error glass">
            <strong>Could not reach GitHub.</strong>
            <span>{error}</span>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ marginTop: 12 }}
            >
              <Icon.GitHub /> View profile on GitHub
            </a>
          </div>
        )}

        {!loading && !error && user && (
          <div className="gh-grid">
            {/* Card 1 — Identity (spans 2 rows on left) */}
            <div className="glass gh-card gh-card-identity">
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="gh-avatar"
              />
              <div className="gh-identity-body">
                <div className="gh-name-row">
                  <div className="gh-name">{user.name || user.login}</div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="gh-handle"
                  >
                    @{user.login}
                  </a>
                </div>
                <p className="gh-bio">{user.bio || 'Full Stack Developer.'}</p>
                <div className="gh-stats">
                  <div className="gh-stat">
                    <div className="gh-stat-v">{user.public_repos}</div>
                    <div className="gh-stat-k">Repos</div>
                  </div>
                  <div className="gh-stat">
                    <div className="gh-stat-v">{user.followers}</div>
                    <div className="gh-stat-k">Followers</div>
                  </div>
                  <div className="gh-stat">
                    <div className="gh-stat-v">{user.following}</div>
                    <div className="gh-stat-k">Following</div>
                  </div>
                </div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="gh-profile-btn"
                >
                  <Icon.GitHub /> Open profile <Icon.ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Card 2 — Languages */}
            <div className="glass gh-card">
              <div className="gh-card-title">Language focus</div>
              {langCounts.length === 0 ? (
                <p className="gh-empty">No language data yet.</p>
              ) : (
                <div className="gh-langs">
                  {langCounts.slice(0, 6).map((l) => (
                    <div key={l.name} className="gh-lang">
                      <div className="gh-lang-row">
                        <span
                          className="gh-lang-dot"
                          style={{ background: l.color }}
                        />
                        <span className="gh-lang-name">{l.name}</span>
                        <span className="gh-lang-count">
                          {l.count} · {l.pct}%
                        </span>
                      </div>
                      <div className="gh-lang-bar">
                        <span
                          className="gh-lang-fill"
                          style={{
                            width: `${l.pct}%`,
                            background: l.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card 3 — Top Repos */}
            <div className="glass gh-card">
              <div className="gh-card-title">Top repositories</div>
              {topRepos.length === 0 ? (
                <p className="gh-empty">No repositories yet.</p>
              ) : (
                <ul className="gh-repos">
                  {topRepos.map((r) => (
                    <li key={r.name} className="gh-repo">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="gh-repo-link"
                      >
                        <span
                          className="gh-repo-dot"
                          style={{ background: r.languageColor }}
                        />
                        <div className="gh-repo-body">
                          <div className="gh-repo-name">{r.name}</div>
                          {r.description && (
                            <div className="gh-repo-desc">
                              {r.description}
                            </div>
                          )}
                        </div>
                        <div className="gh-repo-meta">
                          {r.stars > 0 && (
                            <span className="gh-repo-stat">
                              <Icon.Star size={11} />
                              {formatStars(r.stars)}
                            </span>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Card 4 — Recent Activity (full width below) */}
            <div className="glass gh-card gh-card-recent">
              <div className="gh-card-title-row">
                <div className="gh-card-title">Recent activity</div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="gh-card-link"
                >
                  See all <Icon.ArrowRight size={12} />
                </a>
              </div>
              {recent.length === 0 ? (
                <p className="gh-empty">No recent public activity.</p>
              ) : (
                <ul className="gh-recent">
                  {recent.map((r) => (
                    <li key={r.name} className="gh-recent-item">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="gh-recent-link"
                      >
                        <span
                          className="gh-recent-dot"
                          style={{ background: r.languageColor }}
                        />
                        <div className="gh-recent-body">
                          <div className="gh-recent-name">{r.name}</div>
                          <div className="gh-recent-meta">
                            {r.language && <span>{r.language}</span>}
                            {r.language && <span className="dot-sep">·</span>}
                            <span>pushed {r.when}</span>
                          </div>
                        </div>
                        <Icon.ExternalLink size={14} className="gh-recent-arrow" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
