import React from 'react';
import { FlatList, View } from 'react-native';
import { useGetEventsQuery } from '../../../App/api/apiSlices/EventApi';
import { EventsMedium } from '../../../entities/EventsMedium';

interface Props {
  code: CategoriesTypes.Category['code'] | undefined;
}

export function EventsListMedium({ code }: Props) {
  const { data } = useGetEventsQuery({
    code
  });
  const dataEvents = {
    data: [
      {
        _id: '1',
        name: 'Tech Conference 2024',
        description:
          'Annual tech conference focusing on latest trends in technology.',
        date: [
          {
            start: new Date('2024-09-15T09:00:00Z'),
            end: new Date('2024-09-15T17:00:00Z')
          }
        ],
        duration: 8,
        place: 'Convention Center',
        address: '123 Main St, Tech City',
        mainImage:
          'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
        images: [
          { url: 'https://example.com/images/session1.jpg', alt: 'Session 1' },
          { url: 'https://example.com/images/session2.jpg', alt: 'Session 2' }
        ],
        rate: 4.8,
        ageRating: 18,
        price: 150.0,
        categories: ['Technology', 'Conference'],
        participants: ['participant1@example.com', 'participant2@example.com'],
        organizers: ['organizer1@example.com'],
        status: 'will be'
      },
      {
        _id: '2',
        name: 'Music Festival',
        description: 'A weekend filled with music and fun.',
        date: [
          {
            start: new Date('2024-08-20T12:00:00Z'),
            end: new Date('2024-08-22T23:59:59Z')
          }
        ],
        duration: 72,
        place: 'Open Grounds',
        address: '456 Music Ave, Fest Town',
        mainImage:
          'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
        images: [
          {
            url: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
            alt: 'Main Stage'
          },
          {
            url: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
            alt: 'Crowd'
          }
        ],
        rate: 4.5,
        ageRating: 12,
        price: 75.0,
        categories: ['Music', 'Festival'],
        participants: ['participant3@example.com', 'participant4@example.com'],
        organizers: ['organizer2@example.com', 'organizer3@example.com'],
        status: 'will be'
      },
      {
        _id: '3',
        name: 'Art Exhibition',
        description: 'Exhibition of modern art pieces by renowned artists.',
        date: [
          {
            start: new Date('2024-07-10T10:00:00Z'),
            end: new Date('2024-07-10T18:00:00Z')
          }
        ],
        duration: 8,
        place: 'Art Gallery',
        address: '789 Art Blvd, Creative City',
        mainImage:
          'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
        images: [
          {
            url: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
            alt: 'Art Piece 1'
          },
          {
            url: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2022/8/8b460f41da58bf7c6547307598a505a4/3dd52716cd9af9b17e3f1d49830aa528.jpeg',
            alt: 'Art Piece 2'
          }
        ],
        rate: 4.9,
        ageRating: 0,
        price: 30.0,
        categories: ['Art', 'Exhibition'],
        participants: ['participant5@example.com', 'participant6@example.com'],
        organizers: ['organizer4@example.com'],
        status: 'right now'
      }
    ]
  };

  return (
    <View>
      {dataEvents?.data && (
        <FlatList
          data={dataEvents?.data || []}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <EventsMedium event={item} />}
        />
      )}
    </View>
  );
}
