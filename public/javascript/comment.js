const commentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#username-comment').value.trim();
    const article_id = document.querySelector('#article-id').innerHTML;

    if (content && article_id) {
        console.log(content, article_id);

        const newComment = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, article_id }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Comment successful')
                //console.log(data);
                document.location.reload();

            })
            .catch((err) => {
                console.error(err);
            });
    };
};

const commentBtn = document.getElementById("comment");
commentBtn.addEventListener("click", commentFormHandler);
