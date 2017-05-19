const request = require('request');

/** Data that must be specified to set a Github PR status. */
export interface GithubStatusData {
  result: boolean;
  name: string;
  description: string;
  url: string;
};

/** Function that sets a Github commit status */
export function setGithubStatus(commitSHA: string,
                                statusData: GithubStatusData,
                                repoSlug: string,
                                token: string) {
  const state = statusData.result ? 'success' : 'failure';

  const data = JSON.stringify({
    state: state,
    target_url: statusData.url,
    context: statusData.name,
    description: statusData.description
  });

  const headers =  {
    'Authorization': `token ${token}`,
    'User-Agent': `${statusData.name}/1.0`,
    'Content-Type': 'application/json'
  };

  return new Promise((resolve) => {
    request({
      url: `https://api.github.com/repos/${repoSlug}/statuses/${commitSHA}`,
      method: 'POST',
      form: data,
      headers: headers
    }, function (error: any, response: any) {
      console.log(response.statusCode);
      resolve(response.statusCode);
    });
  });
}
