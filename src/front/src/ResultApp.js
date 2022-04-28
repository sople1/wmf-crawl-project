import React, { useState, useEffect } from 'react';


function make_alpha_str(char_arr) {
    let charcode = {
        min: 'A'.charCodeAt(0),
        max: 'Z'.charCodeAt(0),
    };  // min, max (uppercase 기준, A to Z)
    let current = charcode.min;

    let gstr = "";
    let add_char = (char) => {
        if (!!char_arr[char]) {
            while (char_arr[char] > 0) {
                gstr += char;
                char_arr[char] -= 1;
            }
        }
    }

    while (current <= charcode.max) {
        // uppercase
        let now_char = String.fromCharCode(current);
        add_char(now_char);

        // lowercase
        add_char(now_char.toLowerCase());

        current += 1;
    }

    return gstr;
}


function make_num_str(char_arr) {
    let max = 9;
    let current = 0;

    let gstr = "";
    let add_char = (char) => {
        if (!!char_arr[char]) {
            while (char_arr[char] > 0) {
                gstr += char;
                char_arr[char] -= 1;
            }
        }
    }

    while (current <= max) {
        add_char(current);

        current += 1;
    }

    return gstr;
}


function make_result(char_arr, grouping) {
    let ag = make_alpha_str(char_arr).split('');
    let ng = make_num_str(char_arr).split('');
    let groups = [];
    let gstr = "";

    while (ag.length > 0 || ng.length > 0) {
        if (ag.length > 0) {
            gstr += ag.shift();
            if (gstr.length == grouping) {
                groups.push(gstr);
                gstr = "";
            }
        }
        
        if (ng.length > 0) {
            gstr += ng.shift();
            if (gstr.length == grouping) {
                groups.push(gstr);
                gstr = "";
            }
        }
    }

    return {
        groups: groups,
        remain: gstr
    };
}


function ResultApp(props) {
    const [state, setState] = useState({
        chars: [],
        grouping: 5,
        result: {
            groups: [],
            remain: ""
        }
    });

    useEffect(() => {
        let new_props = {...props};
        if (Object.keys(new_props.chars).length > 0)
            new_props.result = make_result(new_props.chars, new_props.grouping);
        else
            new_props.result = {
                groups: [],
                remain: ""
            };
        setState(new_props);
    }, [props]);

    return (
        <ul className="list-unstyled" id="result">
            <li>
                <dl id="result-grouping">
                    <dt>몫</dt>
                    <dd>{state.result.groups.join(', ')}</dd>
                </dl>
            </li>
            <li>
                <dl id="result-remain">
                    <dt>나머지</dt>
                    <dd>{state.result.remain}</dd>
                </dl>
            </li>
        </ul>
    );
}

export default ResultApp;
