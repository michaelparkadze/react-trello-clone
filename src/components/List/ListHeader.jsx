import { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export default function ListHeader(props) {
  const [listHeader, setListHeader] = useState("");
  const [editing, setEditing] = useState(false);

  const { title, listKey, handleUpdateList, handleDeleteList } = props;

  useEffect(() => {
    setListHeader(title);
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setListHeader(e.target.value);
  };

  const handleEnableEdit = () => {
    setEditing(true);
    setListHeader(title);
  };

  const handleFormSubmit = (event, callback, listKey, listTitle) => {
    event.preventDefault();

    if (listHeader !== "") {
      callback(listKey, listTitle).then(() => {
        setListHeader("");
        setEditing(false);
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Delete this list
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="list-container__content__header">
      {editing ? (
        <form
          onSubmit={(event) =>
            handleFormSubmit(event, handleUpdateList, listKey, listHeader)
          }
          onBlur={(event) =>
            handleFormSubmit(event, handleUpdateList, listKey, listHeader)
          }
        >
          <input
            type="text"
            value={listHeader}
            onChange={(e) => handleInputChange(e)}
            autoFocus
          />
        </form>
      ) : (
        <>
          <div onClick={() => handleEnableEdit()}>{title}</div>
        </>
      )}
      <Space direction="vertical">
        <Space wrap>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button
              shape="circle"
              style={{ border: "none", boxShadow: "none" }}
              icon={
                <MoreOutlined
                  style={{ transform: "rotate(90deg)", fontSize: 22 }}
                />
              }
              className="list-menu"
            />
          </Dropdown>
        </Space>
      </Space>
    </div>
  );
}
