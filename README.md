Задание 1. Подготовка рабочего окружения

Установка NodeJS
1. Скачал и установил последнюю или стабильную версию [Node.js](https://nodejs.org/).
2. Проверил установку, выполнив команды в терминале:
   ```sh
   node -v
   npm -v
   ```
3. Убедился, что версии отображаются корректно.

 Настройка нового проекта React с помощью Vite
1. В командной строке выполнил команду:
   ```sh
   npm create vite@latest my-app
   ```
2. Выбрал:
   - Framework: React
   - Variant: JavaScript
3. Перешёл в папку проекта:
   ```sh
   cd my-app
   ```
4. Установил ависимости:
   ```sh
   npm install
   ```
5. Запустил сервер разработки:
   ```sh
   npm run dev
   ```
   Если возникнет ошибка, связанная с выполнением скриптов в системе, выполните команду:
   ```sh
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
   Затем повторил запуск:
   ```sh
   npm run dev
   ```

 Задание 2. Создание компонентов в React

 Компонент Header
1. Создаю файл `src/components/Header.jsx`.
2. Добавляю в него следующий код:
   ```jsx
   function Header() {
     return (
       <header>
         <h1>Mini-Blog</h1>
       </header>
     );
   }
   
   export default Header;
   ```

Компонент Footer
1. Создал файл `src/components/Footer.jsx`.
2. Добавляю следующий код:
   ```jsx
   function Footer() {
     return (
       <footer>
         <p>&copy; {new Date().getFullYear()} Mini-Blog</p>
       </footer>
     );
   }
   
   export default Footer;
   ```

 Компонент Article
1. Создал файл `src/components/Article.jsx`.
2. Добавил следующий код:
   ```jsx
   function Article({ title, text }) {
     return (
       <article>
         <h2>{title}</h2>
         <p>{text}</p>
       </article>
     );
   }
   
   export default Article;
   ```

 Компонент ArticleList
1. Создал файл `src/components/ArticleList.jsx`.
2. Добавил следующий код:
   ```jsx
   import Article from "./Article";

   function ArticleList() {
     const articles = [
       { title: "Статья 1", text: "Текст статьи 1" },
       { title: "Статья 2", text: "Текст статьи 2" },
       { title: "Статья 3", text: "Текст статьи 3" },
       { title: "Статья 4", text: "Текст статьи 4" },
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
   ```

Объединение компонентов в App
1. В файле `src/App.jsx` заменил код на:
   ```jsx
   import Header from "./components/Header.jsx";
   import ArticleList from "./components/ArticleList.jsx";
   import Footer from "./components/Footer.jsx";

   function App() {
     return (
       <div>
         <Header />
         <ArticleList />
         <Footer />
       </div>
     );
   }
   
   export default App;
   ```

Задание 3. Тестирование компонентов
1. Запустил сервер разработки:
   ```sh
   npm run dev
   ```
2. Открыл браузер и перешёл по адресу, указанному в консоли.
3. Убедился, что компоненты Header, ArticleList и Footer отображаются на странице.

## Контрольные вопросы
1. Это JSX — расширение языка JavaScript. Он используется в React для упрощения работы с разметкой, улучшая читаемость кода.
2. Различие между функциональными и классовыми компонентами заключается в их синтаксисе и возможностях.
   Функциональные компоненты более простые и компактные, не имеют состояния и методов жизненного цикла в своем синтаксисе, что делает их быстрее и легче в написании и понимании.
   Классовые компоненты более мощные и имеют больше возможностей, включая возможность использования состояния и методов жизненного цикла, что позволяет более гибко управлять поведением компонента
3. Данные передаются в компонент через атрибуты, когда компонент используется в родительском компоненте.
4. В функциональном компоненте props принимаются как объект. Доступ к данным в props можно получить либо через объект целиком, либо с помощью деструктуризации для удобства.

