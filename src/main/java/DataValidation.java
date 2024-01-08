import java.util.ArrayList;

public class DataValidation {
    double x;
    double y;
    double r;
    public DataValidation(double x, double y, double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean checkHits(){
        if ((x <= 0 && y >= 0) && (x >= -r && y <= (r/2))){
            return true;
        }
        else if ((x <= 0 && y <= 0) && ((r*r) >= (x * x + y * y))) {
            return true;
        }
        else if (x >= 0 && x <= r/2 && y >= 0 && y<=r/2 && (x + y)<= r/2) {
            return true;
        }
        return false;
    }

    public boolean isDataValid(){
        return isXValid() && isRValid() && isYValid();
    }

    private boolean isXValid(){
        return x >= -2 && x <= 2;
    }

    private boolean isYValid(){
        return y <= 3 && y >= -5;
    }

    private boolean isRValid(){
        ArrayList<Double> availableValues = new ArrayList<>();
        for (double i = 1; i <= 3; i += 0.5) {
            availableValues.add(i);
        }
        return availableValues.contains(r);
    }
}
