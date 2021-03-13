import React from "react";
import Input from "./Input";
import ButtonWithProgress from "./ButtonWithProgress";
import ProfileImageWithDefault from "./ProfileImageWithDefault"
const ProfileCard = (props) => {
  const { displayName, username, image } = props.user;
  const showEditButton = props.isEditable && !props.inEditMode;


  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImageWithDefault
          alt="profile"
          width="200"
          height="200"
          className="rounded-circle shadow"
          image={image} // from db
          src={props.loadedImage} // from file select
        />
      </div>
      <div className="card-body text-center">
        {!props.inEditMode && <h4>{`${displayName}@${username}`}</h4>}
        {/* classNames from bootstrap */}
        {/* when component in edit mode the layout will change completely */}
        {props.inEditMode && (
          <div className="mb-2">
            <Input
              value={displayName}
              onChange={props.onChangeDisplayName}
              label={`Change Display Name for ${username}`}
              hasError={props.errors.displayName && true}
              error={props.errors.displayName}
            />
            <input
              className="form-control-file mt-2"
              type="file"
              onChange={props.onFileSelect}
            />
          </div>
        )}
        {/* edit button will only show when the component is editable and not in edit mode */}
        {/* coz in edit mode we will be able to change the picture and display name */}

        {showEditButton && (
          <button
            className="btn btn-outline-success"
            onClick={props.onClickEdit}
          >
            <i className="fas fa-user-edit" /> Edit
          </button>
        )}

        {/* In edit mode save and cancel button will show */}
        {props.inEditMode && (
          <div>
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={props.onClickSave}
              text={
                <span>
                  <i className="fas fa-save" /> Save YOU
                </span>
              }
              pendingApiCall={props.pendingUpdateCall}
              disabled={props.pendingUpdateCall}
            />

            <button
              className="btn btn-outline-secondary ml-1"
              onClick={props.onClickCancel}
              disabled={props.pendingUpdateCall}
            >
              <i className="fas fa-window-close" /> Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
