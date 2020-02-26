export const scopes = [
  {
    key: 'notify',
    description: 'Пользователь разрешил отправлять ему уведомления (для flash/iframe-приложений). ',
  },
  { key: 'friends', description: 'Доступ к друзьям. ' },
  { key: 'photos', description: 'Доступ к фотографиям. ' },
  { key: 'audio', description: 'Доступ к аудиозаписям. ' },
  { key: 'video', description: 'Доступ к видеозаписям. ' },
  { key: 'stories', description: 'Доступ к историям. ' },
  { key: 'pages', description: 'Доступ к wiki-страницам. ' },
  { key: 'status', description: 'Доступ к статусу пользователя. ' },
  { key: 'notes', description: 'Доступ к заметкам пользователя. ' },
  {
    key: 'messages',
    description:
      'Доступ к расширенным методам работы с сообщениями (только для Standalone-приложений, прошедших модерацию). ',
  },
  {
    key: 'wall',
    description:
      'Доступ к обычным и расширенным методам работы со стеной. \n Данное право доступа по умолчанию недоступно для сайтов (игнорируется при попытке авторизации для приложений с типом «Веб-сайт» или по схеме Authorization Code Flow). ',
  },
  {
    key: 'ads',
    description:
      'Доступ к расширенным методам работы с рекламным API. Доступно для авторизации по схеме Implicit Flow или Authorization Code Flow. ',
  },
  {
    key: 'offline',
    description:
      'Доступ к API в любое время  (при использовании этой опции параметр expires_in, возвращаемый вместе с access_token, содержит 0 — токен бессрочный). Не применяется в Open API. ',
  },
  { key: 'docs', description: 'Доступ к документам. ' },
  { key: 'groups', description: 'Доступ к группам пользователя. ' },
  { key: 'notifications', description: 'Доступ к оповещениям об ответах пользователю. ' },
  {
    key: 'stats',
    description:
      'Доступ к статистике групп и приложений пользователя, администратором которых он является. ',
  },
  { key: 'email', description: 'Доступ к email пользователя. ' },
  { key: 'market', description: 'Доступ к товарам. ' },
];

export const scopesInput: any = document.getElementById('scopes');

export function getSelectedScopes(): string[] {
  return [...scopesInput.selectedOptions].map(option => option.value);
}

export function renderScopes(selectedScopes: string[]) {
  const scopesElement = document.getElementById('scopes');

  scopesElement.innerHTML = scopes
    .filter(scope => scope.key !== 'messages')
    .map(scope => {
      const option = document.createElement('option');
      option.value = scope.key;
      option.innerHTML = `${scope.key} - ${scope.description}`;
      option.setAttribute('selected', 'selected');

      if (selectedScopes && !selectedScopes.includes(scope.key)) {
        option.removeAttribute('selected');
      }

      return option.outerHTML;
    })
    .join('');
}
