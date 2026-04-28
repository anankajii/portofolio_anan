import { useState, useEffect } from "react";

const langColors = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Java: "#b07219", PHP: "#4F5D95", HTML: "#e34c26", CSS: "#563d7c",
  Vue: "#41b883", Dart: "#00B4AB", Go: "#00ADD8", default: "#8b949e",
};

export default function GithubContent({ isMobile }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/anankajii"),
          fetch("https://api.github.com/users/anankajii/repos?sort=updated&per_page=6"),
        ]);
        setProfile(await profileRes.json());
        setRepos(await reposRes.json());
      } catch {
        setError("Failed to load Github data");
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
        <div className="relative w-12 h-12 mb-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 bg-white/60 rounded-full"
              style={{
                left: "50%", top: "0",
                transformOrigin: "0.5px 24px",
                transform: `rotate(${i * 45}deg)`,
                animation: "spin-fade 1s linear infinite",
                animationDelay: `${i * 0.125}s`,
              }}
            />
          ))}
        </div>
        <p className="text-white/70 text-sm">Loading Github profile...</p>
        <style>{`@keyframes spin-fade { 0%,100%{opacity:.2} 50%{opacity:1} }`}</style>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="h-full flex items-center justify-center" style={{ minHeight: 200 }}>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const glassCard = isMobile
    ? { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" }
    : { background: "rgba(17,24,39,0.5)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(40px)" };
  const glassHeader = isMobile
    ? { background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.12)" }
    : { background: "rgba(17,24,39,0.5)", borderBottom: "1px solid rgba(255,255,255,0.15)" };
  const glassStat = isMobile
    ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }
    : { background: "rgba(17,24,39,0.5)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(20px)" };

  return (
    <div className="h-full overflow-y-auto text-white">
      {/* Header */}
      <div className="px-6 py-5" style={glassHeader}>
        <div className="flex items-start gap-5">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-20 h-20 rounded-full"
            style={{ border: "2px solid rgba(255,255,255,0.25)" }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold">{profile.name || profile.login}</h1>
              <span className="text-white/50 text-sm">@{profile.login}</span>
              <a
                href={`https://github.com/${profile.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                View on Github
              </a>
            </div>
            {profile.bio && <p className="text-white/60 text-sm mt-1">{profile.bio}</p>}
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              {profile.location && <span className="text-white/50 text-xs">📍 {profile.location}</span>}
              {profile.company && <span className="text-white/50 text-xs">🏢 {profile.company}</span>}
              {profile.blog && (
                <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-cyan-300 text-xs hover:underline">
                  🔗 {profile.blog}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {[
            { label: "Repos",     value: profile.public_repos },
            { label: "Followers", value: profile.followers },
            { label: "Following", value: profile.following },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg px-4 py-2 text-center min-w-[80px]" style={glassStat}>
              <div className="text-cyan-400 font-bold text-lg">{stat.value}</div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Repositories */}
      <div className="p-6">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white/60">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
          Popular Repositories
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-4 transition-all group"
              style={glassCard}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white/50 flex-shrink-0">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                  </svg>
                  <span className="text-cyan-300 group-hover:underline text-sm font-medium truncate">{repo.name}</span>
                </div>
                <span className="text-xs rounded-full px-2 py-0.5 text-white/50 flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  {repo.private ? "Private" : "Public"}
                </span>
              </div>
              {repo.description && <p className="text-white/50 text-xs mb-3 line-clamp-2">{repo.description}</p>}
              <div className="flex items-center gap-3 text-xs text-white/40">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColors[repo.language] || langColors.default }} />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
                {repo.forks_count > 0 && <span>🍴 {repo.forks_count}</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
