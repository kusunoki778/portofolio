const githubUser = 'kusunoki778';
const githubRepositories = ['my_Cooking_tubespm', 'rt-management-system', 'livora', 'webcmsadmintmii'];
const githubPublicRepoFallback = 8;
const chart = document.querySelector('#activity-chart');

if (chart) {
  const now = new Date();
  const showFallback = (message) => { chart.innerHTML = '<div class="empty-activity">Activity data is temporarily unavailable.<br><a href="https://github.com/kusunoki778" target="_blank" rel="noreferrer">View the complete activity on GitHub ↗</a></div>'; document.querySelector('#github-status').textContent = message; };
  const getJson = (url) => fetch(url, { headers: { Accept: 'application/vnd.github+json' } }).then((response) => response.ok ? response.json() : Promise.reject());
  const commitRequests = githubRepositories.map((repository) => getJson(`https://api.github.com/repos/${githubUser}/${repository}/commits?per_page=100`).then((commits) => ({ repository, commits })));
  const contributionRequest = getJson(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`);
  const publicReposRequest = getJson(`https://api.github.com/users/${githubUser}/repos?type=public&per_page=100`);

  Promise.allSettled([contributionRequest, getJson(`https://api.github.com/users/${githubUser}`), publicReposRequest, ...commitRequests]).then((results) => {
    const contributions = results[0].status === 'fulfilled' ? results[0].value : null;
    const profile = results[1].status === 'fulfilled' ? results[1].value : {};
    const publicRepos = results[2].status === 'fulfilled' ? results[2].value : [];
    const repositoryResults = results.slice(3).filter((result) => result.status === 'fulfilled').map((result) => result.value);
    document.querySelector('#github-repos').textContent = profile.public_repos ?? (publicRepos.length || githubPublicRepoFallback);
    const monthCounts = {};
    const repositoryCounts = {};
    repositoryResults.forEach(({ repository, commits }) => {
      repositoryCounts[repository] = commits.length;
      commits.forEach((commit) => { const date = commit.commit?.author?.date || commit.commit?.committer?.date; const key = date?.slice(0, 7); if (key) monthCounts[key] = (monthCounts[key] || 0) + 1; });
    });
    const totalCommits = Object.values(repositoryCounts).reduce((sum, count) => sum + count, 0);
    if (contributions?.contributions?.length) {
      Object.keys(monthCounts).forEach((key) => { monthCounts[key] = 0; });
      contributions.contributions.forEach((contribution) => { const key = contribution.date.slice(0, 7); monthCounts[key] = (monthCounts[key] || 0) + contribution.count; });
    }
    const contributionTotal = contributions?.contributions?.reduce((sum, contribution) => sum + contribution.count, 0) || totalCommits;
    document.querySelector('#github-events').textContent = contributionTotal;
    const monthKeys = Object.keys(monthCounts).sort().slice(-12).map((key) => { const [year, month] = key.split('-'); return { key, count: monthCounts[key], label: new Date(Number(year), Number(month) - 1, 1).toLocaleString('en-US', { month: 'short' }), year: year.slice(-2) }; });
    const max = Math.max(...monthKeys.map((month) => month.count), 1);
    chart.innerHTML = monthKeys.length ? monthKeys.map((month) => `<div class="activity-month"><div class="bar-track"><span style="height:${Math.max(8, (month.count / max) * 100)}%" title="${month.count} commits"></span></div><strong>${month.count}</strong><small>${month.label}<i>${month.year}</i></small></div>`).join('') : '<div class="empty-activity">No commit data available.</div>';
    const topRepositories = Object.entries(repositoryCounts).filter(([, activity]) => activity > 0).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (topRepositories.length) {
      const repositoryPanel = document.createElement('div');
      repositoryPanel.className = 'top-repositories';
      repositoryPanel.innerHTML = `<p>Most active repositories</p>${topRepositories.map(([repository, activity], index) => `<a href="https://github.com/${githubUser}/${repository}" target="_blank" rel="noreferrer"><span>0${index + 1}</span><strong>${repository}</strong><small>${activity} commits ↗</small></a>`).join('')}`;
      document.querySelector('.github-panel').appendChild(repositoryPanel);
    }
    document.querySelector('#github-status').textContent = contributions ? 'GitHub contribution activity — last 12 months.' : 'GitHub activity is temporarily unavailable.';
  }).catch(() => showFallback('GitHub commit data could not be loaded right now.'));
}
