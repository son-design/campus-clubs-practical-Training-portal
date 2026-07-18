package tz.ac.suza.campus_portal.dto.response;

import lombok.Builder;
import lombok.Data;
import tz.ac.suza.campus_portal.model.Club;
import java.util.Date;

@Data
@Builder
public class ClubResponse {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Integer memberCount;
    private Date createdAt;
    private String leaderName;

    public static ClubResponse fromEntity(Club club) {
        return ClubResponse.builder()
                .id(club.getId())
                .name(club.getName())
                .description(club.getDescription())
                .category(club.getCategory())
                .memberCount(club.getMembers() != null ? club.getMembers().size() : 0)
                .createdAt(club.getCreatedAt())
                .leaderName(club.getLeader() != null ? club.getLeader().getUser().getFullName() : null)
                .build();
    }
}