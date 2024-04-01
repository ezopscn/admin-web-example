import * as Icon from '@ant-design/icons';
import React from 'react';

// 生成菜单结构
function GetMenuItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

// 文字转换成图标
function ConvertTextToIcon(iconName) {
  return React.createElement(Icon[iconName]);
}

// 生成主菜单树
function GenerateMenuTree(parentId, menus) {
  const tree = [];
  for (const menu of menus) {
    if (menu.parent_id === parentId) {
      const newMenu = GetMenuItem(
        menu.label,
        menu.key,
        menu.icon ? ConvertTextToIcon(menu.icon) : null, // icon 问题
        menu.children
      );
      newMenu.children = GenerateMenuTree(menu.id, menus);
      // 没有子菜单也显示下拉标识问题
      if (newMenu.children.length === 0) {
        delete newMenu.children;
      }
      tree.push(newMenu);
    }
  }
  return tree;
}

// 生成 Tree 结构的菜单树
function GenerateMenuTreeData(parentId, menus) {
  const tree = [];
  for (const menu of menus) {
    if (menu.parent_id === parentId) {
      const newMenu = {
        title: menu.label,
        key: menu.key,
        children: menu.children
      };
      newMenu.children = GenerateMenuTreeData(menu.id, menus);
      // 没有子菜单也显示下拉标识问题
      if (newMenu.children.length === 0) {
        newMenu.isLeaf = true;
        delete newMenu.children;
      }
      tree.push(newMenu);
    }
  }
  return tree;
}

export { ConvertTextToIcon, GenerateMenuTree, GenerateMenuTreeData };
