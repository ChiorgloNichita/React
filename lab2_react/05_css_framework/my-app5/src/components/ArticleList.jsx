import Article from './Article';

function ArticleList() {}
  const articles = [
    { title: "Утро", text: "Проспал будильник" },
    { title: "День", text: "Обед был вкусным" },
    { title: "Вечер", text: "Просмотрел фильм" },
    { title: "Ночь", text: "Заснул поздно" },
  ];
export default function ArticleList() {
  return (
    <>
      <Article
        title={article1.title}
        text={article1.text}
      />
      <Article
        title={article2.title}
        text={article2.text}
      />
      <Article
        title={article3.title}
        text={article3.text}
      />
      <Article
        title={article4.title}
        text={article4.text}
      />
    </>
  );
}
