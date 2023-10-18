

export function ToggleDim() {
    document.body.classList.toggle("dimmed");
    document.querySelectorAll(".dim_overlay").forEach((arrow) =>{
      arrow.classList.toggle("dim");
    });
}

export function Undim() {
  document.body.classList.remove("dimmed");
  document.querySelectorAll(".dim_overlay").forEach((arrow) =>{
    arrow.classList.remove("dim");
  });
}


