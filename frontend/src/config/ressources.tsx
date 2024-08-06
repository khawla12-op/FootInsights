import { DashboardOutlined, TeamOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export const resources :IResourceItem[]=[
    {
        name: "dashboard",
        list: "/",
        meta: {
          label: "Dashboard",
          icon: <DashboardOutlined />,
        },
      },
      {
        name: "players",
        list: "/players",
        show: "/players/:id",
        create: "/players/new",
        edit: "/palyers/edit/:id",
        meta: {
          label: "Players",
          icon: <TeamOutlined />
        },
      },
      {
        name: "representation",
        list: "/heatmap",
        create: "/heatmap/new",
        edit: "/heatmap/edit/:id",
        meta: {
          label: "Representation",
          icon: <FontAwesomeIcon icon={faFutbol} />,
        },
      },
      {
        name: "chatbot",
        list: "/chatbot",
        create: "/chatbot/new",
        edit: "/chatbot/edit/:id",
        meta: {
          label: "Chatbot",
          icon: <FontAwesomeIcon icon={faRobot} />, 
        },
      }

]