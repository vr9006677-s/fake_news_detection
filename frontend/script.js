async function check() {
    const text = document.getElementById("news").value;

    const res = await fetch("http://localhost:3000/check-news", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    const data = await res.json();

    const resultElement = document.getElementById("result");

    resultElement.innerText = data.result;

    if (data.result === "Real News") {
        resultElement.style.color = "lightgreen";
    } else {
        resultElement.style.color = "red";
    }
}