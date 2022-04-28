import './App.css';

function App() {
  return (
    <div className="App">
      <form name="crawl-form" className="crawl-form">
        <ul className="list-unstyled" id="crawl-form-body">
          <li>
            <label for="url">URL</label>
            <input type="text" name="url" id="url" />
          </li>
          <li>
            <label for="type">Type</label>
            <select name="type" id="type">
              <option value="0">HTML 태그제외</option>
              <option value="1">Text 전체</option>
            </select>
          </li> 
          <li>
            <label for="grouping">출력묶음단위(자연수)</label>
            <input type="text" name="grouping" id="grouping" />
          </li>
        </ul>
        <button type="submit">출력</button>
      </form>
      <ul className="list-unstyled" id="result">
        <li>
          <dl id="result-grouping">
            <dt>몫</dt>
            <dd></dd>
          </dl>
        </li>
        <li>
          <dl id="result-remain">
            <dt>나머지</dt>
            <dd></dd>
          </dl>
        </li>
      </ul>
    </div>
  );
}

export default App;
