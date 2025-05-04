export const toolHtml: string = `
<style>
   .fabric-tool-parent-div {
     border: 1px solid #ccc;
     position: absolute;
     top: 10px;
     left: 50%;
     transform: translateX(-50%);
     background-color: rgba(255, 255, 255, 0.5);
     z-index: 11;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 5px;
     color: #000;
     user-select: none;
     font-size: 13px;
   }
   .fabric-tool-parent-span {
     display: inline-block;
     margin: 3px 0;
     padding: 0 5px;
     cursor: pointer;
     box-sizing: content-box;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   .fabric-tool-parent-span .fabric-tool-parent-span-label {
     margin-left: 5px;
   }
   .fabric-tool-parent-span:hover {
     color: hsl(212 100% 45%);
   }
   .fabric-tool-parent-span:first-child{
     border-right: 1px solid #ccc;
   }
 </style>
 <div class="fabric-tool-parent-div">
   <span class="fabric-tool-parent-span" id="fabric-tool-parent-span-layer">
     <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
        height="20"
       viewBox="0 0 24 24"
     >
       <path
         fill="currentColor"
         d="M4.979 9.685C2.993 8.891 2 8.494 2 8s.993-.89 2.979-1.685l2.808-1.123C9.773 4.397 10.767 4 12 4s2.227.397 4.213 1.192l2.808 1.123C21.007 7.109 22 7.506 22 8s-.993.89-2.979 1.685l-2.808 1.124C14.227 11.603 13.233 12 12 12s-2.227-.397-4.213-1.191z"
       />
       <path
         fill="currentColor"
         fill-rule="evenodd"
         d="M2 8c0 .494.993.89 2.979 1.685l2.808 1.124C9.773 11.603 10.767 12 12 12s2.227-.397 4.213-1.191l2.808-1.124C21.007 8.891 22 8.494 22 8s-.993-.89-2.979-1.685l-2.808-1.123C14.227 4.397 13.233 4 12 4s-2.227.397-4.213 1.192L4.98 6.315C2.993 7.109 2 7.506 2 8"
         clip-rule="evenodd"
       />
       <path
         fill="currentColor"
         d="m19.021 13.685l-2.808 1.124C14.227 15.603 13.233 16 12 16s-2.227-.397-4.213-1.191L4.98 13.685C2.993 12.891 2 12.493 2 12c0-.445.807-.812 2.42-1.461l3.141 1.256C9.411 12.535 10.572 13 12 13s2.59-.465 4.439-1.205l3.14-1.256C21.194 11.189 22 11.555 22 12c0 .493-.993.89-2.979 1.685"
       />
       <path
         fill="currentColor"
         d="m19.021 17.685l-2.808 1.123C14.227 19.603 13.233 20 12 20s-2.227-.397-4.213-1.192L4.98 17.685C2.993 16.89 2 16.493 2 16c0-.445.807-.812 2.42-1.461l3.141 1.256C9.411 16.535 10.572 17 12 17s2.59-.465 4.439-1.205l3.14-1.256c1.614.65 2.421 1.016 2.421 1.46c0 .494-.993.891-2.979 1.686"
       />
     </svg>
     <span class="fabric-tool-parent-span-label">图层</span>
   </span>
   <span class="fabric-tool-parent-span" id="fabric-tool-parent-span-undo">
     <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
        height="20"
       viewBox="0 0 24 24"
     >
       <path
         fill="currentColor"
         fill-rule="evenodd"
         d="M7.53 3.47a.75.75 0 0 1 0 1.06L5.81 6.25h9.226c.904 0 1.633 0 2.222.053c.606.055 1.136.172 1.617.45a3.75 3.75 0 0 1 1.373 1.372c.277.481.394 1.011.449 1.617c.053.589.053 1.318.053 2.222v.072c0 .904 0 1.633-.053 2.222c-.055.606-.171 1.136-.45 1.617a3.75 3.75 0 0 1-1.372 1.373c-.481.277-1.011.394-1.617.449c-.589.053-1.318.053-2.222.053H8a.75.75 0 0 1 0-1.5h7c.948 0 1.61 0 2.122-.047c.503-.046.788-.13 1.003-.254a2.25 2.25 0 0 0 .824-.824c.124-.215.208-.5.254-1.003c.046-.512.047-1.174.047-2.122s0-1.61-.047-2.122c-.046-.503-.13-.788-.254-1.003a2.25 2.25 0 0 0-.824-.824c-.215-.124-.5-.208-1.003-.254c-.512-.046-1.174-.047-2.122-.047H5.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0"
         clip-rule="evenodd"
       />
     </svg>
     <span class="fabric-tool-parent-span-label"  >撤销<span id="fabric-undo-count" style="color:red;">（0）</span></span>
   </span>
   <span class="fabric-tool-parent-span" id="fabric-tool-parent-span-redo">
     <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
        height="20"
       viewBox="0 0 24 24"
     >
       <path
         fill="currentColor"
         fill-rule="evenodd"
         d="M16.47 3.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9c-.948 0-1.61 0-2.122.047c-.503.046-.788.13-1.003.254a2.25 2.25 0 0 0-.824.824c-.124.215-.208.5-.254 1.003c-.046.512-.047 1.174-.047 2.122s0 1.61.047 2.122c.046.502.13.788.254 1.003c.198.342.482.626.824.824c.215.124.5.208 1.003.254c.512.046 1.174.047 2.122.047h7a.75.75 0 0 1 0 1.5H8.964c-.904 0-1.633 0-2.222-.053c-.606-.055-1.136-.172-1.617-.45a3.75 3.75 0 0 1-1.373-1.372c-.277-.481-.394-1.011-.449-1.617c-.053-.589-.053-1.318-.053-2.222v-.072c0-.904 0-1.633.053-2.222c.055-.606.172-1.136.45-1.617a3.75 3.75 0 0 1 1.372-1.373c.481-.277 1.011-.394 1.617-.449c.589-.053 1.318-.053 2.222-.053h9.225l-1.72-1.72a.75.75 0 0 1 0-1.06"
         clip-rule="evenodd"
       />
     </svg>
     <span class="fabric-tool-parent-span-label">恢复<span id="fabric-redo-count" style="color:red;">（0）</span></span>
   </span>
 </div>
`;
// .fabric-tool-parent-span:nth-child(3)
