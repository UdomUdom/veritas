import WeekView from "@/components/calendar/WeekView";

export default function Classroom() {
  return (
    <section className="container mx-auto bg-base-200 pt-8">
      <div>
        <h1 className="text-center text-2xl font-semibold">Schedules</h1>
        <WeekView />
        <h2 className="text-center text-1xl font-semibold">Assignments</h2>
        <div>
          {/* Mock Preview*/}
          <div className="mx-auto max-w-2xl py-40">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>
          {/* Mock Preview*/}
        </div>
      </div>
    </section>
  );
}
