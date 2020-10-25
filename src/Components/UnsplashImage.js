import styled from "styled-components";
import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { DiscussionEmbed } from "disqus-react";
const Img = styled.img`
  width: 100%;
  height: 100%;
  objec-fit: cover;
`;

const Footer = styled.div`
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
`;

export default function UnsplashImage({ url, key }) {
  const [titleD, settitleD] = useState("");
  const [identifierD, setIdentifierD] = useState("");
  const disqusConfig = {
    url: identifierD,
    identifier: identifierD,
    title: titleD,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    settitleD(url);
    setIdentifierD(url);
    setModal(!modal);
  };

  return (
    <>
      <Img src={url} alt="" onClick={toggle}></Img>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Img src={url} alt="" />
        </ModalBody>
        <Footer>
          {/* <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          /> */}

          {/* <CommentEmbed
            commentId={url}
            showMedia={true}
            showParentComment={true}
            width={420}
            height={320}
          /> */}
          <DiscussionEmbed shortname="unsplashme" config={disqusConfig} />
        </Footer>
      </Modal>
    </>
  );
}
