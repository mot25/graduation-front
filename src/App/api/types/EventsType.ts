declare namespace EventsType {
  interface RequestGetEvents {
    name?: string;
    code?: string;
  }

  interface DateEvent {
    id: number;
    dateStart: Date;
    dateEnd: Date;
  }

  interface RequestCreateEvent {
    name: string;
    description: string;
    date: DateEvent[];
    duration: number;
    place: string;
    address: string;
    mainImage: CommonTypes.FileImagesTypes | undefined;
    images: CommonTypes.FileImagesTypes[];
    rate?: number;
    ageRating: number;
    price: number;
    categories?: string[];
    participants?: string[];
    organizers?: string[];
    status?: 'will be' | 'right now' | 'completed';
  }

  interface ResponseEventsType extends Omit<RequestCreateEvent, 'mainImage'> {
    _id: string;
    mainImage: string;
  }

  type RequestGetEventById = Pick<ResponseEventsType, '_id'>;
}
