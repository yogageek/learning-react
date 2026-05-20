import React, { useState, useEffect,useMemo } from "react";

const useAnyKeyToRender = () => {
    const [, forceRender] = useState();

    useEffect(() => {
        window.addEventListener("keydown", forceRender);
        return () => window.removeEventListener("keydown", forceRender);
    }, []);
};

function WordCount({ children = "" }) {
    useAnyKeyToRender();

    //   const words = children.split(" ");// 每次 render 產生「新陣列」
    const words = useMemo(() => children.split(" "), [children]);

    useEffect(() => {
        console.log("fresh render");
    }, [words]);

    return (
        <>
            <p>{children}</p>
            <p>
                <strong>{words.length} - words</strong>
            </p>
        </>
    );
}

export default function App() {
    return <WordCount>You are not going to believe this but...</WordCount>;
}
