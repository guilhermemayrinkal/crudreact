/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";

import ClientList from "views/clientes/ClientList.js";
import AddCliente from "views/clientes/AddCliente.js";
import UpdateClient from "views/clientes/UpdateClient.js";

import ProdutoList from "views/produtos/ProdutoList.js";
import AddProduto from "views/produtos/AddProduto.js";
import UpdateProduto from "views/produtos/UpdateProduto.js";

import VendasList from "views/vendas/VendasList.js";
import AddVenda from "views/vendas/AddVenda.js";
import UpdateVenda from "views/vendas/UpdateVenda.js";

import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  {
    path: "/clientes",
    name: "Clientes",
    icon: "nc-icon nc-notes",
    component: ClientList,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/create_client",
    name: "Adicionar CLiente",
    icon: "nc-icon nc-alien-33",
    component: AddCliente,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/update_client/:id",
    name: "Editar Cliente",
    icon: "nc-icon nc-alien-33",
    component: UpdateClient,
    layout: "/admin"
  },
  {
    path: "/produtos",
    name: "Produtos",
    icon: "nc-icon nc-notes",
    component: ProdutoList,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/create_product",
    name: "Adicionar Produto",
    icon: "nc-icon nc-alien-33",
    component: AddProduto,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/update_product/:id",
    name: "Editar Produto",
    icon: "nc-icon nc-alien-33",
    component: UpdateProduto,
    layout: "/admin"
  },
  {
    path: "/vendas",
    name: "Vendas",
    icon: "nc-icon nc-notes",
    component: VendasList,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/create_venda",
    name: "Adicionar venda",
    icon: "nc-icon nc-alien-33",
    component: AddVenda,
    layout: "/admin"
  },
  {
    redirect: true,
    path: "/update_venda/:id",
    name: "Editar Venda",
    icon: "nc-icon nc-alien-33",
    component: UpdateVenda,
    layout: "/admin"
  },
];

export default dashboardRoutes;
