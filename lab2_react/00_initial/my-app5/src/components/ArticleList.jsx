import Article from "./Article";

export default function ArticleList() {
  const articles = [
    { title: "День в универе", text: "Сегодня был плохой день" },
    { title: "День дома", text: "Сегодня был хороший день" },
    { title: "День на море", text: "Сегодня был отличный день" },
    { title: "День в школе", text: "Сегодня был ужасный день" },
  ];

     return (
       <main>
         {articles.map((article, index) => (
           <Article key={index} title={article.title} text={article.text} />
         ))}
       </main>
     );
   }
  