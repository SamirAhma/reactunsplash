import styled from "styled-components";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Disqus from "disqus-react";

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
  const disqusShortname = "unsplashme";
  const disqusConfig = {
    url: "http://localhost:3000",
    identifier: key,
    title: key,
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Img src={url} key={key} alt="" onClick={toggle}></Img>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Img src={url} key={key} alt="" />
        </ModalBody>
        <Footer>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </Footer>
      </Modal>
    </>
  );
}
