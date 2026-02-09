import axios from "axios";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./Longpulling.module.css";

interface IMessages {
  id: string;
  message: string;
}

const Longpulling = () => {
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [value, setValue] = useState("");

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-messages");
      setMessages((prev) => [...prev, data]);
      // await subscribe();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      setTimeout(() => {
        subscribe();
      }, 5000);
    }
  };

  useEffect(() => {
    // subscribe();
  }, []);

  const toggleButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue('');
    await axios.post("http://localhost:4000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className={styles.body}>
      <form className={styles.form}>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button onClick={(e) => toggleButton(e)} className={styles.button}>
          Отправить
        </button>
      </form>
      <div className={styles.list}>
        <div>
            qwdqwdqwd
        </div>
        {messages.map((item) => (
          <div key={item.id}>{item.message}</div>
        ))}
      </div>
    </div>
  );
};

export default Longpulling;
