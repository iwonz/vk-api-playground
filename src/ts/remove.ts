const accessToken =
  '7efd13f845c27a93d7370bcb73198e56b10683ec3077028a0adcc05881728f9fee106bc27e2c1cbf98ff5';
const API_VERSION = 5.103;
const PROFILE_ID = 152663687;
const getQuery = owner_id =>
  `https://api.vk.com/method/account.ban?owner_id=${owner_id}&access_token=${accessToken}&v=${API_VERSION}`;
let deactivatedUserIds = [];

async function* send() {
  let i = 0;

  while (i < deactivatedUserIds.length) {
    yield new Promise(resolve => {
      setTimeout(async () => {
        console.log('>>>', getQuery(deactivatedUserIds[i]));
        resolve(await fetch(getQuery(deactivatedUserIds[i])).then(response => response.json()));
      }, 250);
    });

    i++;
  }
}

async function removeDeactivatedFollowers() {
  for await (const response of send()) {
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response);
    }
  }
}

fetch(
  `https://api.vk.com/method/users.getFollowers?user_id=${PROFILE_ID}&count=1000&fields=deactivated,photo_50&access_token=${accessToken}&v=${API_VERSION}`,
)
  .then(response => response.json())
  .then(response => {
    deactivatedUserIds = response.response.items
      .filter(user => user.deactivated || user.photo_50.includes('camera_50'))
      .map(user => user.id);

    console.log(
      response.response.items.filter(
        user => user.deactivated || user.photo_50.includes('camera_50'),
      ),
    );

    removeDeactivatedFollowers();
  });
