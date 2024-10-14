import { ReactNode } from 'react';
import { Modal, ModalProps } from '@mantine/core';

import useMobile from '../../../hooks/useMobile';

import styles from './modal.module.scss';

type ModalWrapperProps = {
  children: ReactNode;
  modalProps: ModalProps;
  withCenteredTitle?: boolean;
};

export const ModalWrapper = ({
  modalProps,
  children,
  withCenteredTitle = true,
}: ModalWrapperProps) => {
  const isMobile = useMobile();
  const isCentered = modalProps.centered ?? true;
  return (
    <Modal
      padding="2rem"
      {...modalProps}
      centered={isCentered}
      className={`${styles.modal} ${
        withCenteredTitle ? styles.modal_title_center : ''
      }`}
      overlayProps={{ zIndex: 200 }}
      size={isMobile ? 'xl' : 'md'}>
      {children}
    </Modal>
  );
};
