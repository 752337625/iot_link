import svgTool from './layer_svg.data';

export const layerHtml = `
<style>
.fabric-layer-parent-div {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 250px;
  background-color: rgba(255, 255, 255,0.5);
  z-index: 10;
  border-radius: 5px;
  border: 1px solid #ccc;
  user-select: none;
  color: #000;
  display: none;
  height: 500px;
  overflow-y: auto;
  padding: 2px;
}
.fabric-layer-parent-item .fabric-layer-item-label:hover,.fabric-layer-parent-title svg:hover,.fabric-layer-item-function svg:hover{
  color: hsl(212 100% 45%);
  cursor: pointer;
}
.fabric-layer-parent-title{
  display:flex;
  padding: 3px 5px;
  align-items: center;
  font-size: 14px;
  position: relative;
   border-bottom: 1px solid #ccc;
}
.fabric-layer-parent-item{
  display: block;
  padding: 3px 5px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
.fabric-layer-parent-item:hover {
  background-color: rgba(0, 0, 0, 0.05);

}
.fabric-layer-parent-item-icon{
  display: inline-block;
  width: 24px;
  height: 24px;
}
.fabric-layer-item-function{
  display: flex;
  align-items: center;
  justify-content: center;

}
.fabric-layer-item-function svg{
  cursor: pointer;
  margin-right:3px;
}
.fabric_layer_animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.fabric_layer_animate__fadeInDown {
  animation-name: fadeInDown;
}
</style>
<div class="fabric-layer-parent-div fabric_layer_animate__animated fabric_layer_animate__fadeInDown" id="fabric-layer-parent-div">
  <span class="fabric-layer-parent-title">
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
     <span style="margin:0 5px;font-weight: bold;display: inline-block;">图层</span>
  </span>
  <div id="fabric-layer-parent-item-function" style="margin: 0px;padding: 0px; width: 100%;"></div>
</div>`;

// 循环创建图层
export function createLayerItemHtml(data: any) {
  let html = '';
  data.objects.forEach((item: any) => {
    const icon =
      item.type.includes('Pipe') || item.type.includes('Path')
        ? svgTool.Pipe
        : svgTool[item.type];

    html += `
    <span class="fabric-layer-parent-item">
      <span class="fabric-layer-item-icon" >
      ${icon}
      </span>
      <span class="fabric-layer-item-label" id='${item.id}' data-id='${item.id}' >
       ${item.dataSet?.title ?? '分组'}
      </span>
      <span class="fabric-layer-item-function">

       <svg  data-del-id='${item.id}' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M6 20V6H5V5h4v-.77h6V5h4v1h-1v14zm1-1h10V6H7zm2.808-2h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"/></svg>

       <svg data-unlock-id='${item.id}' style='${item.lockMovementX && item.lockMovementY && item.lockRotation && item.lockScalingX && item.lockScalingY ? 'display: none' : null};' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h8V6.5A3.5 3.5 0 0 0 11.5 3C9.74 3 8.28 4.3 8.04 6H7.03c.25-2.25 2.15-4 4.47-4C14 2 16 4 16 6.5zM7 9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm4.5 5a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5m0-1a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9 15.5a2.5 2.5 0 0 1 2.5-2.5"/></svg>

       <svg data-lock-id='${item.id}' style='${item.lockMovementX && item.lockMovementY && item.lockRotation && item.lockScalingX && item.lockScalingY ? 'null' : 'display: none'};' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3V6.5C7 4 9 2 11.5 2S16 4 16 6.5zM7 9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm8-1V6.5A3.5 3.5 0 0 0 11.5 3A3.5 3.5 0 0 0 8 6.5V8zm-3.5 6a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5m0-1a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9 15.5a2.5 2.5 0 0 1 2.5-2.5"/></svg>

      <svg data-show-id='${item.id}' style='${item.visible ? null : 'display: none'};' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9"/></svg>

      <svg data-visible-id='${item.id}' style='${item.visible ? 'display: none' : null};' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M2.54 4.71L3.25 4L20 20.75l-.71.71l-3.34-3.35c-1.37.57-2.87.89-4.45.89c-4.56 0-8.5-2.65-10.36-6.5c.97-2 2.49-3.67 4.36-4.82zM11.5 18c1.29 0 2.53-.23 3.67-.66l-1.12-1.13c-.73.5-1.6.79-2.55.79C9 17 7 15 7 12.5c0-.95.29-1.82.79-2.55L6.24 8.41a10.64 10.64 0 0 0-3.98 4.09C4.04 15.78 7.5 18 11.5 18m9.24-5.5C18.96 9.22 15.5 7 11.5 7c-1.15 0-2.27.19-3.31.53l-.78-.78C8.68 6.26 10.06 6 11.5 6c4.56 0 8.5 2.65 10.36 6.5a11.47 11.47 0 0 1-4.07 4.63l-.72-.73c1.53-.96 2.8-2.3 3.67-3.9M11.5 8C14 8 16 10 16 12.5c0 .82-.22 1.58-.6 2.24l-.74-.74c.22-.46.34-.96.34-1.5A3.5 3.5 0 0 0 11.5 9c-.54 0-1.04.12-1.5.34l-.74-.74c.66-.38 1.42-.6 2.24-.6M8 12.5a3.5 3.5 0 0 0 3.5 3.5c.67 0 1.29-.19 1.82-.5L8.5 10.68c-.31.53-.5 1.15-.5 1.82"/></svg>


      <svg  data-selectable-id='${item.id}' style='${item.selectable && item.evented ? 'display: none' : null};' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="m16.19 16.19l1.337-1.215A8.37 8.37 0 0 0 20.25 8.8c0-4.558-3.694-8.3-8.25-8.3c-3.104 0-5.807 1.737-7.216 4.284M12 23.92a9.04 9.04 0 0 1 2.383-6.037M12 23.92a9.04 9.04 0 0 0-2.96-6.61l-2.567-2.334a8.37 8.37 0 0 1-2.6-7.603M12 23.92V24v-.057M.5.5l23 23M9.564 9.564a2.5 2.5 0 1 1 1.872 1.872" stroke-width="1"/></svg>


      <svg data-unselectable-id='${item.id}' style='${item.selectable && item.evented ? null : 'display: none'};' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 23.92a9.04 9.04 0 0 0-2.96-6.61l-2.567-2.334A8.37 8.37 0 0 1 3.75 8.799C3.75 4.242 7.444.5 12 .5s8.25 3.741 8.25 8.298c0 2.343-.989 4.6-2.723 6.177l-2.568 2.334a9.04 9.04 0 0 0-2.96 6.61Zm0 0V24v-.057M12 11.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Z" stroke-width="1"/></svg>

    </span>
    </span>`;
  });
  return html;
}
