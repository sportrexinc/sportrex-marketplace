import React from "react";
import "./modal.css";
import { CloseIcon } from "../../../public/assets/svg/index";
import ActionBtn from "../Button/ActionBtn";
interface modalProps {
  showHeader?: boolean;
  children: any;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void;
  showCloseIcon?: boolean;
  showfooter?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  closeButtonClassName?: string;
  showConfirmButton?: boolean;
  confirmButtonLabel?: string;
  confirmButtonClassName?: string;
  headerClassName?: string;
  isConfirmButtonDisabled?: boolean;
  loading?: boolean;
  modalWidth?: string;
  modalBodyClasses?: string;
  modalFooterClasses?: string;
}

const FixedModal = ({
  showHeader,
  children,
  closeModal,
  onConfirm,
  showCloseIcon,
  showfooter,
  showCloseButton,
  closeButtonLabel,
  closeButtonClassName,
  showConfirmButton,
  confirmButtonLabel,
  confirmButtonClassName,
  headerClassName,
  loading,
  modalWidth,
  isConfirmButtonDisabled,
  modalBodyClasses,
  modalFooterClasses,
}: modalProps) => {
  const findByKey = (name: string) =>
    children.map((child: { key: any }) => {
      if (child.key === name) return child;
    });

  const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    return closeModal(e);
  };

  return (
    <div className="modal-mask modal-close">
      <div className="modal-wrapper">
        <div
          className="modal-container"
          style={{
            maxWidth: modalWidth ? modalWidth : "543px",
            minWidth: modalWidth ? modalWidth : "543px",
          }}
        >
          {showCloseIcon && (
            <button onClick={onCloseModal} className="close-button">
              <CloseIcon />
            </button>
          )}

          {showHeader && (
            <div
              className={`modal-header ${
                headerClassName ? headerClassName : ""
              }`}
            >
              {findByKey("header")}
            </div>
          )}

          <div className={`modal-body ${modalBodyClasses}`}>
            {findByKey("body")}
          </div>

          {showfooter && (
            <div className={`modal-footer ${modalFooterClasses}`}>
              {showCloseButton && (
                <ActionBtn
                  name={closeButtonLabel ? closeButtonLabel : "Cancel"}
                 
                  action={onCloseModal}
                 
                />
              )}

              {showConfirmButton && (
                <ActionBtn
                  name={confirmButtonLabel ? confirmButtonLabel : "Confirm"}
                 
                  
                  action={onConfirm}
                  loading={loading}
                  disabled={isConfirmButtonDisabled}
                />
              )}
              {findByKey("footer")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedModal;
