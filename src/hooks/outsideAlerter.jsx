import {useRef, useState, useEffect} from "react"

const useClickOutside = (handler) => {

    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
           if (!domNode.current.contains(event.target)){
           handler();
           }
         };
         
         document.addEventListener("mousedown", maybeHandler);
         return () => {
           document.removeEventListener("mousedown", maybeHandler);
         }
       });

    return domNode;

};

export default useClickOutside;



//     const ref = useRef<HTMLDivElement>(null)
//     const [visible, setVisible] = useState(false)
//     const handleClickOutside = (event: any) =>{
//         if (ref.current && !ref.current.contains(event.target)) setVisible(false)
//     }

//     useEffect(() =>{ 
//         document.addEventListener('click', handleClickOutside, true)
//         return () => {
//             document.removeEventListener('click', handleClickOutside, true)
//         }

//     }, [ref]);

//     document.addEventListener("click", handleClickOutside, true)

//     return { visible, setVisible, ref }
// }