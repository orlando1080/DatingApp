export type Member = {
  id: string;
  gender: string;
  dateOfBirth: string;
  displayName: string;
  description: string;
  created: string;
  lastActive: string;
  city: string;
  country: string
  imageUrl?: string;
}

export type photo = {
  id: string;
  url: string;
  publicId?: string;
  memberId?: string;
}

export type EditMember = {
  displayName: string;
  description?: string;
  city: string;
  country: string;
}
