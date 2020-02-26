import './assets';

import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';

import { getSelectedScopes, renderScopes, scopesInput } from './scopes';
import { updateAccessTokenUrl } from './token';
import { getCache, setCache } from './cache';
import { removeDeactivatedFollowers } from './remove';

const editor = ace.edit('editor');
editor.session.setMode('ace/mode/javascript');

const clientIdInput: HTMLInputElement = document.getElementById('client-id') as HTMLInputElement;
const removeDeactivatedFollowersButton: HTMLButtonElement = document.getElementById(
  'remove-deactivated-followers',
) as HTMLButtonElement;
const accessTokenInput: HTMLInputElement = document.getElementById(
  'access-token',
) as HTMLInputElement;

const saveToCache = () => {
  setCache({
    clientId: clientIdInput.value,
    accessToken: accessTokenInput.value,
    scopes: getSelectedScopes(),
  });

  editor.setValue(`const access_token = '${accessTokenInput.value}';`);
};

clientIdInput.addEventListener('keyup', () => {
  updateAccessTokenUrl(clientIdInput.value, getSelectedScopes());
});

removeDeactivatedFollowersButton.addEventListener('click', removeDeactivatedFollowers);

scopesInput.addEventListener('change', () => {
  updateAccessTokenUrl(clientIdInput.value, getSelectedScopes());

  saveToCache();
});

clientIdInput.addEventListener('blur', saveToCache);
accessTokenInput.addEventListener('blur', saveToCache);

function init() {
  const cache = getCache();

  clientIdInput.value = cache.clientId;
  accessTokenInput.value = cache.accessToken;

  renderScopes(cache.scopes);

  editor.setValue(`const access_token = '${accessTokenInput.value}';`);

  updateAccessTokenUrl(clientIdInput.value, getSelectedScopes());
}

init();
