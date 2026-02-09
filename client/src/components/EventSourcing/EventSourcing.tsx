import axios from "axios";
import { useEffect, useState, type MouseEvent } from "react";
import styles from './EventSourcing.module.css';


interface IMessage {
  id: string;
  message: string;
}

const EventSourcing = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const [value, setValue] = useState("");

  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:4001/connect");
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessage((prev) => [...prev, message]);
    };
  };

   useEffect(() => {
    subscribe();
  }, []);

  const toggleButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("");
    await axios.post("http://localhost:4001/new-message", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className={styles.body}>
      <form action="#" className={styles.form}>
        <input
          type="text"
          placeholder="Введите сообщение"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          onClick={(e) => toggleButton(e)}
          className={styles.button}
        >
          Отправить
        </button>
      </form>
      <div className={styles.items}>
        {message.map((item) => (
          <p key={item.id} className={styles.item}>{item.message}</p>
        ))}
      </div>
    </div>
  );
};

export default EventSourcing;
