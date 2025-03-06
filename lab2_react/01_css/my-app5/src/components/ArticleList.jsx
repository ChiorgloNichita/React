import Article from "./Article";

   function ArticleList() {
     const articles = [
       { title: "Утро", text: "Проспал будильник" },
       { title: "День", text: "Обед был вкусным" },
       { title: "Вечер", text: "Просмотрел фильм" },
       { title: "Ночь", text: "Заснул поздно" },
     ];

     return (
       <main>
         {articles.map((article, index) => (
           <Article key={index} title={article.title} text={article.text} />
         ))}
       </main>
     );
   }
   
   export default ArticleList;
  