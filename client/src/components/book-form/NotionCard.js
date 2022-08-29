import React, { useContext } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import { TextEditorContext } from "./TextEditor";
const NotionCard = ({ page, closeModal }) => {
  const textEditor = useContext(TextEditorContext);
  const onPageClick = async (id) => {
    const response = await fetch(`/oauth/notion?notionId=${id}`);
    const data = await response.json();
    textEditor.handleEditor(data);
    closeModal(false);
  };
  return (
    <>
      <div className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-3">
        <div
          className="card w-100"
          style={{ cursor: "pointer" }}
          onClick={() => onPageClick(page.id)}
        >
          <img
            className="card-img-top notion-img img-thumbnail"
            alt="note image"
            src="/page.png"
          />
          <div className="card-body">
            <h5
              className="card-title text-center text-primary text-nowrap"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title={page.pageName}
            >
              {page.pageName.length > 16
                ? page.pageName.substring(0, 12) + "..."
                : page.pageName}
            </h5>
          </div>
        </div>
      </div>
      <Tooltip id={page.id} placement="bottom" style={{ display: "none" }}>
        {page.pageName}
      </Tooltip>
    </>
  );
};

export default NotionCard;
