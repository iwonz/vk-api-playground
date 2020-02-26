export function updateAccessTokenUrl(clientId: string, scopes: string[]): void {
  const accessTokenURLElement: HTMLLinkElement = document.getElementById(
    'access-token-url',
  ) as HTMLLinkElement;

  accessTokenURLElement.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=${scopes.join(
    ',',
  )}&response_type=token&v=5.103`;
}
