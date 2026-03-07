import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import { MeetingResponse } from "@/types/meeting";

export const meetingService = {
    create: () => api.post<MeetingResponse>(API_ENDPOINTS.MEETING.BASE),
    getByRoomId: (roomId: string) =>
        api.get<MeetingResponse>(`${API_ENDPOINTS.MEETING.BASE}/${roomId}`),
};
