import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function TimeAppearance({time}: {time:number}) {
  let hour = 0,
    minute = 0,
    second = 0;
  hour = Math.floor(time / 3600);
  minute = Math.floor((time % 3600) / 60);
  second = Math.floor(time % 60);
  return <div>{hour}時間{minute}分{second}秒</div>;
}

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rappedTime, setRappedTime] = useState<number[]>([]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isRunning, time]);

  return (
    <>
      <Box>
        <TimeAppearance time={time}></TimeAppearance>
        <button
          onClick={() => {
            setIsRunning(true);
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            if (isRunning) {
              setRappedTime([...rappedTime, time]);
            }
          }}
        >
          rap
        </button>
        <button
          onClick={() => {
            setTime(0);
            setRappedTime([]);
            setIsRunning(false);
          }}
        >
          reset
        </button>
        <ul>
          {rappedTime.map((raptime, i) => (
            <li key={i}><TimeAppearance time={raptime}></TimeAppearance></li>
          ))}
        </ul>
      </Box>
    </>
  );
}

export default App;
