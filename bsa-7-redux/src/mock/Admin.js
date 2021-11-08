export const createMessageFromAdmin = text => (
  {
    name: 'Keep Simple',
    text: text,
    date: new Date().toLocaleString(),
    edit_date: '',
    user_id: '12345',
    id: String(Math.random() * 10000),
    avatar: 'https://robohash.org/quamestlaborum.png?size=50x50&set=set1'
  }
);

const adminInfo = {
  name: 'Keep Simple',
  user_id: '12345',
  avatar: 'https://robohash.org/quamestlaborum.png?size=50x50&set=set1'
}

export default adminInfo;
