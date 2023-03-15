const articleFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#article-title').value.trim();
    const content = document.querySelector('#article-content').value.trim();

    console.log("showing content and title?", content, title);

    if (content && title) {
        console.log(content, title)

        const newarticle = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({ content, title }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(data => {
                console.log('article posted');
                document.location.replace('/dashboard');

            }).catch((err) => {
                console.error(err);
            });
    };
};
const articleBtn = document.getElementById("article");
articleBtn.addEventListener("click", articleFormHandler);