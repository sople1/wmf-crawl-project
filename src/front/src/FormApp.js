import React, { useState, useEffect } from 'react';


function FormApp(props) {
    const func = props.func;
    const [state, setState] = useState({
        url: '',
        type: 0,
        grouping: 5
    });

    useEffect(() => {
        setState(props);
    }, [props]);

    return (
        <form name="crawl-form" className="crawl-form">
            <ul className="list-unstyled" id="crawl-form-body">
                <li>
                    <label for="url">URL</label>
                    <input type="text" name="url" id="url" value={state.url} onChange={func.update_value} />
                </li>
                <li>
                    <label for="type">Type</label>
                    <select name="type" id="type" value={state.type} onChange={func.update_value}>
                        <option value="0">HTML 태그제외</option>
                        <option value="1">Text 전체</option>
                    </select>
                </li>
                <li>
                    <label for="grouping">출력묶음단위(자연수)</label>
                    <input type="text" name="grouping" id="grouping" value={state.grouping} onChange={func.update_value} />
                </li>
            </ul>
            <button type="submit" onClick={(e) => {
                e.preventDefault();

                func.make_result();
            }}>출력</button>
        </form>
    );
}

export default FormApp;

