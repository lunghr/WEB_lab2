package models;

import java.io.Serial;
import java.io.Serializable;

public class Dot implements Serializable {
    double x;
    double y;
    double r;
    String time;
    String executionTime;
    String hitting;

    public Dot(double x, double y, double r, String time, String executionTime, String hitting) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.time = time;
        this.executionTime = executionTime;
        this.hitting = hitting;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getTime() {
        return time;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public String getHitting() {
        return hitting;
    }
}