import Plus from '../../assets/icon/iconPlus.svg';
export const MainPageTabOptions = {
  title: 'Главная'
};
export const CreateEventsTabOptions = {
  tabBarLabel: () => null,
  tabBarIcon: ({ size }: { size: number }) => (
    <Plus
      width={size}
      height={size}
    />
  )
};
export const SearchTabOptions = {
  title: 'Поиск'
};
export const MyTicketsTabOptions = {
  title: 'Мои билеты'
};
export const ProfileTabOptions = {
  title: 'Профиль'
};
