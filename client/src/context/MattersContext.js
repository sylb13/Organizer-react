import React, { useReducer } from "react";
import axios from "axios";
import { createContext } from "react";

const date = new Date();

const initialState = {
  matters: null,
  activeMatter: { id: 0 },
  toDoList: null,
  activeToDoList: null,
  sort: "newest",
  categories: null,
  alerts: null,
  alert: null,
  hideOrShowDoneMatters: false,
  hideOrShowExpiredMatters: false,
  currentGMT: date.toString().slice(25, 33),
};

const MattersReducer = (state, action) => {
  switch (action.type) {
    case "GET_MATTERS":
      return {
        ...state,
        matters: action.payload,
      };

    case "SET_SORT_TYPE":
      return {
        ...state,
        sort: action.payload,
      };

    // case "ADD_EMPTY_MATTER":
    //   return {
    //     ...state,
    //   };

    case "SET_ACTIVE_MATTER":
      return {
        ...state,
        activeMatter: action.payload,
      };

    // case "SET_MATTER_TITLE":
    //   return {
    //     ...state,
    //   };

    case "GET_TODOLIST":
      return {
        ...state,
        toDoList: action.payload,
      };

    case "SET_ACTIVE_TODOLIST":
      return {
        ...state,
        activeToDoList: action.payload,
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_ALERTS":
      return {
        ...state,
        alerts: action.payload,
      };

    case "GET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };

    case "HIDE_OR_SHOW_DONE_MATTERS":
      return {
        ...state,
        hideOrShowDoneMatters: action.payload,
      };
    case "HIDE_OR_SHOW_EXPIRED_MATTERS":
      return {
        ...state,
        hideOrShowExpiredMatters: action.payload,
      };

    default:
      return { ...state };
  }
};

const MattersContext = createContext(initialState);

const MattersProvider = (props) => {
  const [state, dispatch] = useReducer(MattersReducer, initialState);

  const getMatters = () => {
    let sortType = state.sort;

    console.log(sortType);
    axios.get(`http://localhost:3000/matters/${sortType}`).then((res) => {
      console.log(res.data);

      dispatch({
        type: "GET_MATTERS",
        payload: res.data,
      });
    });
  };

  const setSortType = (sortType) => {
    dispatch({
      type: "SET_SORT_TYPE",
      payload: sortType,
    });
  };

  const addEmptyMatter = () => {
    //  let newMatterId;
    axios
      .post("http://localhost:3000/add-new-matter")
      .then((res) => {
        console.log(res.data);
        // newMatterId = res.data.message;
        // console.log(newMatterId);
        // window.location.reload();
      })
      // .then(() => {
      //   console.log(newMatterId);
      //   axios
      //     .post("http://localhost:3000/add-new-todolist", {
      //       matterId: newMatterId,
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     });
      // })
      .finally(() => getMatters());
  };

  const setActiveMatter = (id) => {
    if (id === null) {
      dispatch({
        type: "SET_ACTIVE_MATTER",
        payload: { id: 0 },
      });
    } else {
      const matterId = id;
      console.log(matterId);
      axios
        .post("http://localhost:3000/get-active-matter", {
          id: matterId,
        })
        .then((res) => {
          console.log(res.data[0]);
          dispatch({
            type: "SET_ACTIVE_MATTER",
            payload: res.data[0],
          });
        });
    }
  };

  const setMatterTitle = (content, id) => {
    axios
      .post("http://localhost:3000/matter-name-change", {
        title: content,
        id: id,
      })
      .then((res) => {
        console.log("Zrobiłem zmianę na " + content);
      });
  };

  const markMatterAsDone = (state, id) => {
    axios
      .post("http://localhost:3000/mark-matter-as-done", {
        isDone: state,
        id: id,
      })
      .then((res) => {
        console.log("isDone zmieniło się na " + state);
      });
  };

  const setHideOrShowDoneMatters = (isHidden) => {
    dispatch({
      type: "HIDE_OR_SHOW_DONE_MATTERS",
      payload: isHidden,
    });
    if (isHidden === true) {
      setActiveMatter(null);
    }
  };

  const setHideOrShowExpiredMatters = (isHidden) => {
    dispatch({
      type: "HIDE_OR_SHOW_EXPIRED_MATTERS",
      payload: isHidden,
    });
    if (isHidden === true) {
      setActiveMatter(null);
    }
  };

  // -------------------------------------   TO DO LIST   -------------------------------------------
  const getToDoList = (id) => {
    let activeToDoList = id;
    if (activeToDoList != null) {
      axios
        .get(`http://localhost:3000/get-todolist${activeToDoList}`)
        .then((res) => {
          dispatch({
            type: "GET_TODOLIST",
            payload: res.data,
          });
          console.log(res.data);
        });
    }
  };

  const addNewToDoList = (id) => {
    axios
      .post("http://localhost:3000/add-new-todolist", {
        matterId: id,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const setActiveToDoList = async (activeM) => {
    //console.log("Nie wiem co jest  " + activeM);
    if (activeM != null) {
      await axios
        .get(`http://localhost:3000/get-active-todolist${activeM}`)
        .then((res) => {
          if (res.data.length === 0) {
            dispatch({
              type: "SET_ACTIVE_TODOLIST",
              payload: null,
            });
            dispatch({
              type: "GET_TODOLIST",
              payload: null,
            });
          } else {
            dispatch({
              type: "SET_ACTIVE_TODOLIST",
              payload: res.data[0].id,
            });
            getToDoList(res.data[0].id);
          }
          console.log(res);
        })
        .then(console.log(state.activeToDoList));
    } else {
      dispatch({
        type: "SET_ACTIVE_TODOLIST",
        payload: null,
      });
      dispatch({
        type: "GET_TODOLIST",
        payload: null,
      });
    }
  };

  const addNewToDoItem = () => {
    axios
      .post("http://localhost:3000/add-new-todoitem", {
        params: {
          activeToDoList: state.activeToDoList,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .finally(() => getToDoList(state.activeToDoList));
  };

  const deleteToDoItem = (id) => {
    axios
      .post("http://localhost:3000/delete-todoitem", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .finally(() => getToDoList(state.activeToDoList));
  };

  const deleteToDoList = (id) => {
    axios
      .post("http://localhost:3000/delete-todolist", {
        toDoListId: id,
      })
      .then((res) => {
        dispatch({
          type: "SET_ACTIVE_TODOLIST",
          payload: null,
        });
        dispatch({
          type: "GET_TODOLIST",
          payload: null,
        });
        console.log(res.data);
      });
  };

  const setToDoItemText = (content, id) => {
    axios
      .post("http://localhost:3000/todoitem-text-change", {
        content: content,
        id: id,
      })
      .then((res) => {
        console.log("Zrobiłem zmianę na " + content);
      });
  };

  const markAsDone = (state, id) => {
    axios
      .post("http://localhost:3000/mark-as-done", {
        isDone: state,
        id: id,
      })
      .then((res) => {
        console.log("isDone zmieniło się na " + state);
      });
  };

  // -------------------------------------   HANDY CALENDARS   -------------------------------------------

  // const getMatterDate = () => {

  // }

  const setMattersDate = (startOrEnd, date) => {
    axios
      .post("http://localhost:3000/set-matters-date", {
        id: state.activeMatter.id,
        startOrEnd: startOrEnd,
        date: date,
      })
      .then((res) => {
        console.log("Zmiana daty zrobiona.");
      });
    // .finally(setActiveMatter(state.activeMatter.id));
  };

  const setMattersTime = (startOrEnd, time) => {
    axios
      .post("http://localhost:3000/set-matters-time", {
        id: state.activeMatter.id,
        startOrEnd: startOrEnd,
        time: time,
      })
      .then((res) => {
        console.log("Zmiana czasu zrobiona.");
      });
    // .finally(setActiveMatter(state.activeMatter.id));
  };

  // -------------------------------------   CATEGORIES   -------------------------------------------

  const getCategories = () => {
    axios.get("http://localhost:3000/get-categories").then((res) => {
      dispatch({
        type: "GET_CATEGORIES",
        payload: res.data,
      });
      console.log(res.data);
    });
  };

  const addNewCategory = () => {
    axios
      .post("http://localhost:3000/add-new-category", {})
      .then((res) => {
        console.log(res.data);
      })
      .finally(setActiveMatter(state.activeMatter.id));
  };

  const setCategoryColor = (categoryId, color) => {
    axios
      .post("http://localhost:3000/set-category-color", {
        categoryId: categoryId,
        color: color,
      })
      .then((res) => {
        // getCategories();
        console.log(res.data);
      })
      .finally(setActiveMatter(state.activeMatter.id));
  };

  const updateCategoryName = (categoryId, content) => {
    axios
      .post("http://localhost:3000/update-category", {
        categoryId: categoryId,
        content: content,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const deleteCategory = (categoryId) => {
    axios
      .post("http://localhost:3000/delete-category", {
        categoryId: categoryId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .finally(setActiveMatter(state.activeMatter.id));
  };

  const assignCategory = (categoryId) => {
    axios
      .post("http://localhost:3000/assign-category", {
        categoryId: categoryId,
        matterId: state.activeMatter.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .finally(setActiveMatter(state.activeMatter.id));
  };

  // -------------------------------------   ALERTS   -------------------------------------------

  const getAlertList = () => {
    axios.get("http://localhost:3000/get-alerts").then((res) => {
      dispatch({
        type: "GET_ALERTS",
        payload: res.data,
      });
      console.log(res.data);
    });
  };

  const getAlert = async () => {
    let alert = null;
    const matterId = parseInt(state.activeMatter.id);
    if (matterId !== 0) {
      await axios
        .get(`http://localhost:3000/get-alert${matterId}`)
        .then((res) => {
          dispatch({
            type: "GET_ALERT",
            payload: res.data[0].date,
          });
          // console.log(res);
          //alert = res.data[0].date;
        });
    }
    console.log(alert);
    // return alert;
  };

  const setAlert = (newDate) => {
    console.log(newDate);
    axios
      .post("http://localhost:3000/set-alert", {
        newDate: newDate,
        matterId: state.activeMatter.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      // .finally(setActiveMatter(state.activeMatter.id));
      .finally(getAlertList());
  };

  return (
    <MattersContext.Provider
      value={{
        matters: state.matters,
        activeMatter: state.activeMatter,
        activeToDoList: state.activeToDoList,
        toDoList: state.toDoList,
        sort: state.sort,
        categories: state.categories,
        activeAlert: state.alert,
        alertsList: state.alerts,
        hideOrShowDoneMatters: state.hideOrShowDoneMatters,
        hideOrShowExpiredMatters: state.hideOrShowExpiredMatters,
        currentGMT: state.currentGMT,
        getMatters,
        setSortType,
        addEmptyMatter,
        setActiveMatter,
        setMatterTitle,
        setHideOrShowDoneMatters,
        setHideOrShowExpiredMatters,
        setActiveToDoList,
        addNewToDoList,
        getToDoList,
        addNewToDoItem,
        setToDoItemText,
        deleteToDoItem,
        deleteToDoList,
        markAsDone,
        setMattersDate,
        setMattersTime,
        markMatterAsDone,
        getCategories,
        updateCategoryName,
        setCategoryColor,
        addNewCategory,
        assignCategory,
        deleteCategory,
        setAlert,
        getAlert,
        getAlertList,
      }}
      {...props}
    />
  );
};

export { MattersContext, MattersProvider };
