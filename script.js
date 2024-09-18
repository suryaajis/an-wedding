const HTTP_GET = "GET";
const HTTP_POST = "POST";
const HTTP_PUT = "PUT";
const HTTP_PATCH = "PATCH";
const HTTP_DELETE = "DELETE";

const dto = (() => {
  const baseResponse = (code, data, error) => {
    return {
      code,
      data,
      error,
    };
  };

  const postCommentResponse = ({ name, comment }) => {
    return {
      name,
      comment,
    };
  };

  const commentResponse = ({ name, comment }) => {
    return {
      name,
      comment,
    };
  };

  const postCommentRequest = (name, comment) => {
    return {
      name,
      comment,
    };
  };

  return {
    baseResponse,
    commentResponse,
    postCommentResponse,
    postCommentRequest,
  };
})();

const request = (method, path) => {
  let url = "https://an-wedding-nest-production.up.railway.app"; // Add 'https://' here
  let req = {
    method: method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };

  if (url.slice(-1) == "/") {
    url = url.slice(0, -1);
  }

  return {
    send(transform = null) {
      return fetch(url + path, req)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw res.error[0];
          }

          if (transform) {
            res.data = transform(res.data);
          }

          return dto.baseResponse(res.code, res.data, res.error);
        })
        .catch((err) => {
          alert(err);
          throw err;
        });
    },
    body(body) {
      req.body = JSON.stringify(body);
      return this;
    },
  };
};

function comment() {
  const comments = document.getElementById("comments");

  return request(HTTP_GET, `/api/comments`)
    .send()
    .then((res) => {
      if (res.data.length === 0) {
        return res;
      }

      console.log(res);
      //   comments.setAttribute("data-loading", "false");
      //   comments.innerHTML = res.data.map((c) => card.renderContent(c)).join("");
      //   res.data.forEach(card.fetchTracker);
      return res;
    });
}

comment();
