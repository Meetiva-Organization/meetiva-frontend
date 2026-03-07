"use client";

import { useAuth } from "@/hooks/useAuth";
import { meetingService } from "@/services/meeting.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { MeetingResponse } from "@/types/meeting";
import { LogOut, MessageSquare, Mic, Video, Copy, Check } from "lucide-react";

export default function MeetingRoom() {
    const params = useParams();
    const router = useRouter();
    const roomId = params.roomId as string;
    const [meeting, setMeeting] = useState<MeetingResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const meetingUrl = typeof window !== "undefined"
        ? `${window.location.origin}/meeting/${meeting?.roomId}`
        : "";

    const handleCopy = () => {
        navigator.clipboard.writeText(meetingUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    useEffect(() => {
        if (!roomId) return;
        meetingService
            .getByRoomId(roomId)
            .then((res) => setMeeting(res.data))
            .catch(() => setError("Phòng họp không tồn tại hoặc đã kết thúc."));
    }, [roomId]);

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0a1a] text-white">
                <p className="text-lg text-red-400">{error}</p>
                <button
                    onClick={() => router.push("/")}
                    className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold cursor-pointer hover:bg-violet-500"
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    if (!meeting) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a1a] text-white">
                <p>Đang tải phòng họp...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0a1a] text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg font-bold">Phòng họp</h1>
                    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
                        <span className="text-sm text-zinc-400 max-w-[300px] truncate">
                            {meetingUrl}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="cursor-pointer text-zinc-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
                <button onClick={() => router.push("/")} className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2 text-sm font-semibold cursor-pointer hover:bg-red-500">
                    <LogOut className="h-4 w-4" />
                    Rời phòng
                </button>
            </header>


            <div className="flex flex-1 items-center justify-center">
                <div className="flex h-80 w-[500px] items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-zinc-500">Video sẽ hiển thị ở đây</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 border-t border-white/10 py-4">
                <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <Mic className="h-5 w-5" />
                </button>
                <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <Video className="h-5 w-5" />
                </button>
                <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <MessageSquare className="h-5 w-5" />
                </button>
            </div>

        </div>
    );
}
