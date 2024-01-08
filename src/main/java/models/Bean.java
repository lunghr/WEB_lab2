package models;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Bean implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private List<Dot> results;

    public Bean() {
        this.results = new ArrayList<>();
    }

    public void add(Dot result) {
        this.results.add(result);
    }

    public List<Dot> getResults() {
        return results;
    }
}

